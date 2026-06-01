import { TileHeader } from "./tile-core";

export interface LinkTile extends TileHeader {
    linkTitle?: string;
    linkColor?: string;
    url?: string;
    openNewTab?: boolean;
    serviceUrl?: string;
}