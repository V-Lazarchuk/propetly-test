import { SliceStrPipe } from './slice-str.pipe';

describe('SliceStrPipe', () => {
    it('create an instance', () => {
        const pipe = new SliceStrPipe();
        expect(pipe).toBeTruthy();
    });

    it('should slice string', () => {
        const pipe = new SliceStrPipe();
        const val = `Lorem ipsum dolor sit amet, consectetur adipisicing elit.
         Atque cupiditate, deserunt dolores ducimus enim exercitationem incidunt laudantium magnam nihil,
          numquam optio quidem quo repellat velit vitae. Blanditiis facilis quo ut!`;
        const length = 30;
        expect(pipe.transform(val, length).length).toBe(length + 3);
    });

    it('should not slice str', () => {
        const pipe = new SliceStrPipe();
        const val = 'lorem ipsum dolor';
        expect(pipe.transform(val, 30)).toBe(val);
    });
});
