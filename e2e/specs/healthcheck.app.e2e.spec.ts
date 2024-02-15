import { ping } from 'tcp-ping';

describe('Health', () => {
  test('Reservation', async () => {
    const response = await fetch('http://reservations:5050/');
    expect(response.ok).toBeTruthy();
  });

  test('Auth', async () => {
    const response = await fetch('http://auth:5051/');
    expect(response.ok).toBeTruthy();
  });

  test('Payments', (done) => {
    ping({ address: 'payments', port: 5053 }, (err) => {
      if (err) {
        fail(err);
      }
      done();
    });
  });

  test('Notifications', (done) => {
    ping({ address: 'notifications', port: 5054 }, (err) => {
      if (err) {
        fail(err);
      }
      done();
    });
  });
});
