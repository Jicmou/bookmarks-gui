import { ITag, TagList, ITagResponse } from '../types/tag.type';
export const MOCK_TAG: ITag = {
  id: 1,
  name: 'foo',
};

export const MOCK_TAG_LIST: TagList = [
  MOCK_TAG,
  {
    ...MOCK_TAG,
    id: 2,
  },
  {
    ...MOCK_TAG,
    id: 3,
  },
  {
    ...MOCK_TAG,
    id: 4,
  },
  {
    ...MOCK_TAG,
    id: 5,
  },
];

export const MOCK_TAG_RESPONSE_BODY: ITagResponse = {
  tag: MOCK_TAG,
};
