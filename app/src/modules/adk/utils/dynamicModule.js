import register from './register';

export default (name) => {
  return {
    created() {
      const store = this.$store;
      if (!(store && store.state && store.state[name])) {
        console.log(`registering module: ${name}`);
        register(name, store);
      } else {
        console.log(`reusing module: ${name}`);
      }
    },
  };
};