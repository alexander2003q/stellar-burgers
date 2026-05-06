import { feedReducer, fetchFeed } from './feedSlice';

describe('feed slice reducer', () => {
  it('should set isLoading=true on pending', () => {
    const state = feedReducer(undefined, fetchFeed.pending('request-id'));

    expect(state.isLoading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set data and isLoading=false on fulfilled', () => {
    const payload = {
      success: true,
      orders: [
        {
          _id: '1',
          status: 'done',
          name: 'Test',
          createdAt: '',
          updatedAt: '',
          number: 1,
          ingredients: ['a']
        }
      ],
      total: 100,
      totalToday: 5
    };

    const state = feedReducer(
      undefined,
      fetchFeed.fulfilled(payload, 'request-id')
    );

    expect(state.orders).toEqual(payload.orders);
    expect(state.total).toBe(100);
    expect(state.totalToday).toBe(5);
    expect(state.isLoading).toBe(false);
  });

  it('should set error and isLoading=false on rejected', () => {
    const state = feedReducer(
      undefined,
      fetchFeed.rejected(new Error('Ошибка'), 'request-id')
    );

    expect(state.error).toBe('Ошибка');
    expect(state.isLoading).toBe(false);
  });
});
