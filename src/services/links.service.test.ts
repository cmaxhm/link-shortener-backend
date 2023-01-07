import { Link } from "../interfaces/link.interface";
import { LinksService } from "./links.service";

const mockedLink: Link = {
  _id: 1,
  uuid: 'test',
  shortUrlId: 'test',
  originalUrl: 'test'
};
const mockedLinkResponse: Promise<Link> = new Promise((resolve: Function) => {
  resolve(mockedLink);
});

describe('Links service', () => {
  let linksService: LinksService;

  beforeEach(() => {
    linksService = new LinksService();
    linksService.connectToDatabase = jest.fn().mockReturnValue({
      countDocuments: () => new Promise(resolve => resolve(1)),
      insertOne: (value: Link | any) => mockedLinkResponse,
      findOne: (elementToFind: any) => mockedLinkResponse,
      findOneAndDelete: (elementToFindAndDelete: any) => mockedLinkResponse
    });
  });

  it('Should add link', () => {
    linksService.add(mockedLink).then((result: Link) => {
      expect(result).toBeTruthy();
    });
  });

  it('Should get link', () => {
    linksService.get('testLinkId').then((result: Link | null) => {
      expect(result).toBeTruthy();
    });
  });

  it('Should remove link', () => {
    linksService.remove('testLinkId').then(result => {
      expect(result).toBeTruthy();
    });
  });
});
