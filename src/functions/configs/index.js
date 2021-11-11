let { createClient } = require('@supabase/supabase-js')

export const supabase = () => {
   return createClient('https://rtxiicnfcvolulrkryhi.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2xlIjoiYW5vbiIsImlhdCI6MTYyNjg4OTk5NSwiZXhwIjoxOTQyNDY1OTk1fQ.5Du7PcPHlXo6LSuDkc0BwFrdfMg3Ou-312cuZf-ILRs')
}


export const key = () => {
   return {
      SECRETE: '6d066956-4af5-4a19-99eb-d33f7d27a9de', 
      OTPAPIKEY : '345c4a1f06dc91d01ae427c5028290696e8e80b0038eb16ef43ca5f6fea755f9',
      OTPAPIUSERNAME : 'unboxAPP'
   }
}