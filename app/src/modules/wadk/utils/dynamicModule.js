import register from './register';

export default name => ({
  created() {
    const store = this.$store;
    if (!(store && store.state && store.state[name])) {
      register(name, store);
    }
  },
});
