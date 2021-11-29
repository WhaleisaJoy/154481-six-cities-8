import { fireEvent } from '@testing-library/react';
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

  // it('should be correctly change state', () => {
  //   const inputReview = {current: document.createElement('textarea')};
  //   const expectedInitialState = {rating: 0, review: ''};
  //   const {result} = renderHook(
  //     () => useReviewsForm(ID, jest.fn(), jest.fn()),
  //   );

  //   const [initialState] = result.current;
  //   const [,setForm] = result.current;
  //   const [,,, handleReviewsChange] = result.current;

  //   act(() => handleReviewsChange((inputReview) => {
  //     setForm({
  //       ...initialState,
  //       review: 'Text',
  //     });
  //   }));

  //   [,, handleAnswerChange] = result.current;
  //   act(() => handleAnswerChange(3, true));

  //   const [answers] = result.current;
  //   expect(initialAnswers).toStrictEqual(expectedInitialAnswers);
  //   expect(answers[1]).toBe(true);
  //   expect(answers[3]).toBe(true);
  // });

  it('should be call onCommentPost', () => {
    const onCommentPost = jest.fn();
    const {result} = renderHook(() =>
      useReviewsForm(ID, jest.fn(), jest.fn()),
    );

    const [{review, rating}] = result.current;
    const [,, handleSubmit] = result.current;

    handleSubmit(fireEvent[FormDataEvent]);

    expect(onCommentPost).toBeCalled();
    expect(onCommentPost).toHaveReturnedWith(void 0);
    expect(onCommentPost).toHaveBeenCalledWith({ID, review, rating});
  });
});
