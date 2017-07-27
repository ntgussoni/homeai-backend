const config = {
  port: 3000,
  modules: {
    enabled: [
      'test',
      'another-test'
    ]
  }
};

if (typeof module !== 'undefined') { module.exports = config; }
