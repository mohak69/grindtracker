const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Supabase configuration
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Routes
app.post('/api/logs', async (req, res) => {
  try {
    const { date, gate_status, dsa_status, score } = req.body;
    
    // Check if entry already exists for this date
    const { data: existingEntry, error: checkError } = await supabase
      .from('daily_logs')
      .select('*')
      .eq('date', date)
      .single();

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 is "no rows returned"
      throw checkError;
    }

    if (existingEntry) {
      return res.status(400).json({ 
        success: false, 
        error: 'An entry already exists for this date. You can only log once per day.' 
      });
    }
    
    const { data, error } = await supabase
      .from('daily_logs')
      .insert([{ date, gate_status, dsa_status, score }]);

    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.get('/api/logs', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('daily_logs')
      .select('*')
      .order('date', { ascending: false });

    if (error) throw error;
    
    res.json({ success: true, data });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 