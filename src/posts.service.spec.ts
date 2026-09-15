import { PostsService } from './posts.service';

describe('PostsService', () => {
  let postsService: PostsService;

  beforeEach(() => {
    postsService = new PostsService();
  });

  describe('.findMany', () => {
    const posts = [
      {text: 'Post 1'},
      {text: 'Post 2'},
      {text: 'Post 3'},
      {text: 'Post 4'},
    ];

    beforeEach(() => {
      posts.forEach((post) => postsService.create(post));
    });

    it('should return all posts if called without options', () => {
      const result = postsService.findMany();

      expect(result).toHaveLength(4);
      expect(result.map((post) => post.text)).toEqual([
        'Post 1',
        'Post 2',
        'Post 3',
        'Post 4',
      ]);
    });

    it('should return correct posts for skip and limit options', () => {
      const result = postsService.findMany({ skip: 1, limit: 2 });

      expect(result).toHaveLength(2);
      expect(result.map((post) => post.text)).toEqual(['Post 2', 'Post 3']);
    });

    it('should return all posts from skip if only skip is passed', () => {
      const result = postsService.findMany({ skip: 2 });

      expect(result).toHaveLength(2);
      expect(result.map((post) => post.text)).toEqual(['Post 3', 'Post 4']);
    });

    it('should return first posts if only limit is passed', () => {
      const result = postsService.findMany({ limit: 2 });

      expect(result).toHaveLength(2);
      expect(result.map((post) => post.text)).toEqual(['Post 1', 'Post 2']);
    });

    it('should return empty array if limit is 0', () => {
      const result = postsService.findMany({ limit: 0 });

      expect(result).toEqual([]);
    });

    it('should return empty array if skip is beyond the list length', () => {
      const result = postsService.findMany({ skip: 10 });

      expect(result).toEqual([]);
    });
  });
});