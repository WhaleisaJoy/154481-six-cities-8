import { renderHook } from '@testing-library/react-hooks';
import { useReviewsForm } from './use-reviews-form';

const ID = '1';

describe('Hook: useReviewsForm', () => {
  it('should return array with 5 elements', () => {
    const {result} = renderHook(() =>
      useReviewsForm(ID, jest.fn(), jest.fn()),
    );

    const [form, setForm, handleSubmit, handleReviewsChange, handleRatingChange] = result.current;

    expect(result.current).toHaveLength(5);
    expect(form).toBeInstanceOf(Object);
    expect(setForm).toBeInstanceOf(Function);
    expect(handleSubmit).toBeInstanceOf(Function);
    expect(handleReviewsChange).toBeInstanceOf(Function);
    expect(handleRatingChange).toBeInstanceOf(Function);
  });
});
