import { JudgmentEnum } from '../../../types/JudgmentEnum';
import { DependentServiceError } from '../errors';
import { REDDIT_AGENT_ERROR, INVALID_POST } from '../errors/supportCodes';

export class RedditAgent {
  async fetchPost() {
    try {
      const response = await fetch(
        'https://www.reddit.com/r/aitafiltered/random.json?limit=1'
      );

      if (!response.ok)
        throw new DependentServiceError('reddit', REDDIT_AGENT_ERROR);

      const data = await response.json();

      return this.validate(
        data[0].data.children[0].data.crosspost_parent_list[0]
      );
    } catch (e) {
      if (e instanceof DependentServiceError) throw e;
      throw new DependentServiceError('reddit', REDDIT_AGENT_ERROR);
    }
  }

  validate(post: any) {
    if (!Object.values(JudgmentEnum).includes(post.link_flair_text)) {
      throw new DependentServiceError('reddit', INVALID_POST);
    }

    if (/.*\[deleted\]|\[removed\].*/.test(post.selftext_html)) {
      throw new DependentServiceError('reddit', INVALID_POST);
    }
    return post;
  }
}
