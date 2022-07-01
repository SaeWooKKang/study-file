// 2022-07-01 (+2)
function solution(nums) {
  const gift_count = nums.length / 2;
  const map = new Set(nums);

  return map.size >= gift_count 
    ? gift_count
    : map.size;
}