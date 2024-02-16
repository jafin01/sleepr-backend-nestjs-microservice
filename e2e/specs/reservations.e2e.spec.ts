describe('Reservations', () => {
  let jwt = '';
  beforeAll(async () => {
    const user = {
      email: 'jafinjahfar@gmail.com',
      password: 'Password123!',
    };

    await fetch('http://auth:5051/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    const response = await fetch('http://auth:5051/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });

    // const token = await response.headers.getSetCookie();
    // console.log('token', token);
    jwt = await response.text();
  });

  test('Create & Get', async () => {
    const reservation = {
      startDate: '02/05/2024',
      endDate: '02/06/2024',
      placeId: '123',
      charge: {
        amount: 15,
        // "paymentMethodId": "pm_1OgLAOSF6XG5URE8ytxRyMXG"
      },
    };

    const createReservation = await fetch(
      'http://reservations:5050/reservations',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authentication: jwt,
        },
        body: JSON.stringify(reservation),
      },
    );
    expect(createReservation.ok).toBeTruthy();
    const createdReservation = await createReservation.json();

    const getReservation = await fetch(
      `http://reservations:5050/reservations/${createdReservation._id}`,
      {
        headers: {
          Authentication: jwt,
        },
      },
    );

    expect(await getReservation.json()).toEqual(createdReservation);

    const getAllReservations = await fetch(
      'http://reservations:5050/reservations',
      {
        headers: {
          Authentication: jwt,
        },
      },
    );
    expect(getAllReservations.ok).toBeTruthy();
  });
});
