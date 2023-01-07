import { Link } from "../interfaces/link.interface";
import { LinksService } from "../services/links.service";
import { addLink, getLink, removeLink } from "./links.controller";

const mockedLinkResponse: Promise<Link> = new Promise((resolve: Function) => {
  resolve({
    _id: 1,
    uuid: 'test',
    shortUrlId: 'test',
    originalUrl: 'test'
  });
});

describe('Links controller', () => {
  let linksService: LinksService;

  beforeEach(() => {
    linksService = new LinksService();
    linksService.add = jest.fn().mockReturnValue(mockedLinkResponse);
    linksService.get = jest.fn().mockReturnValue(mockedLinkResponse);
    linksService.remove = jest.fn().mockReturnValue(mockedLinkResponse)
  });

  it('Should add link', () => {
    addLink('http://testurl.test/').then(result => {
      expect(result._id).toEqual(1);
      expect(result.uuid).toEqual('test');
      expect(result.shortUrlId).toEqual('test');
      expect(result.originalUrl).toEqual('test');
    });
  });

  it('Should get link', () => {
    getLink('testLinkId').then((result) => {
      expect(result).toBeTruthy();
    });
  });

  it('Should remove link', () => {
    removeLink('testLinkId').then((result) => {
      expect(result).toBeTruthy();
    });
  });
});
