class MockRes {
  status = null;
  response = null;

  constructor() {
    this.status = null;
    this.response = null;
  }

  setStatus(num) {
    this.status = num;
    return this.initState();
  }

  setMessage(res) {
    this.response = res;
    return this.initState();
  }

  initState() {
    return {
      status: this.setStatus,
      send: this.setMessage,
    };
  }
}
