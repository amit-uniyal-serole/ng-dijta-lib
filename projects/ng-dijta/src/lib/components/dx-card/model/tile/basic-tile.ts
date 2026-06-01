import { TileFooter, TileHeader } from "./tile-core";

export interface BasicTile extends TileFooter, TileHeader {
    description?: string;
}