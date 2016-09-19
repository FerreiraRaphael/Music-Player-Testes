const binder = (self, ...methods) => {
  methods.forEach(method => self[method] = self[method].bind(self)) }

export default binder
