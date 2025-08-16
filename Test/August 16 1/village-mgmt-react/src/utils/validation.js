export const isValidNIC = (nic) => /^[0-9]{9}[VX]|[0-9]{12}$/.test(nic);
export const isValidPhone = (p) => /^\+?\d{9,15}$/.test(p);
export const required = (v) => (v ? true : "This field is required");