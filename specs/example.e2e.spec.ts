describe('Example', () => {
  it('should be ok', () => {
    const y = new (class {
      public a = true;
    })();
    expect(y.a).toBe(true);
  });
});
