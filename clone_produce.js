function produce(base, recipe) {
  // your code here
  let clone = JSON.parse(JSON.stringify(base));
  recipe(clone);

  if (JSON.stringify(clone) === JSON.stringify(base)) return base;

  cloneObjects(base, clone);

  return clone;
}

function cloneObjects(base, clone) {
  if (!base || !clone) return;

  const keys = Object.keys(clone);

  for (let key of keys) {
    if (JSON.stringify(base[key]) === JSON.stringify(clone[key])) {
      clone[key] = base[key];
    }

    if (typeof clone[key] === "object") {
      cloneObjects(base[key], clone[key]);
    }
  }
}
