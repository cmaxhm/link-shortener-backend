import { v4 as uuidv4 } from 'uuid';
import { Link } from "../interfaces/link.interface";
import { LinksService } from "../services/links.service";
import { generateUrlId } from "../utilities/shorten-url.utility";

const linksService: LinksService = new LinksService();

export function addLink(originalUrl: string): Promise<Link> {
  const link: Link = {
    _id: 1,
    uuid: uuidv4(),
    shortUrlId: generateUrlId(),
    originalUrl: originalUrl
  };

  return linksService.add(link);
}
