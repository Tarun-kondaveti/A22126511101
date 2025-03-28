import express from "express";
import axios from "axios";

const app=express();
const port=9876;

const wsize= 10;
let nums = [];
app.get('/numbers/:numberId', async (req, res) => {
  const numberId = req.params.numberId;
  let newNums = [];
  try {
    const resp = await axios.get(`http://20.244.56.144/test/${numberId}`,{ timeout: 500 });
 newNums = resp.data.nums;
  } catch (error) {
    console.error(error);
  }
  nums = [...new Set([...nums, ... newNums])];
  if (nums.length > wsize) {
    nums = nums.slice(-wsize);
  }
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length || 0;
  res.json({
    windowPrevState: nums.slice(0,  newNums.length),
    windowCurrState: nums,
    nums: newNums,
    avg
  });
});
app.listen(port, () => {
  console.log('Server listening on port 9876');
});
