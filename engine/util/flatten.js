const objFlatten = (obj, mapper = I) => {
  return Object.values(obj).flatMap((v) => {
    const mv = mapper(v);
    return typeof mv === "object" ? objFlatten(mv) : mv;
  });
};
