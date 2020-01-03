function expect(actual) {
  return {
    toBe(to) {
      if(actual !== to) {
        throw new Error('Prueba no exitosa');
      }
    }
  }
}

function it(title, callback) {
  console.info(title);
  try {
    callback();
    console.info(`Succes: ${title}`);
  } catch(e) {
    console.error(e.message);
  }
}

module.exports = {
  expect,
  it
}