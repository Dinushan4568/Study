export const nextId = (arr) => (arr.length ? Math.max(...arr.map(a => Number(a.id) || 0)) + 1 : 1);

export const nextFamilyId = (arr) => {
  const nums = arr.map(f => Number((f.familyId || '').replace(/\D/g, '')) || 0);
  const next = nums.length ? Math.max(...nums) + 1 : 1;
  return `FAM${String(next).padStart(3, '0')}`;
};