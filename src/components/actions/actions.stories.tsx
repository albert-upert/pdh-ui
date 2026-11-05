import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Badge } from "@/components/badge";
import { Block, BlockTitle } from "@/components/block";
import { Button } from "@/components/button";
import { Fab } from "@/components/fab";
import { PlusIcon } from "@/components/icon";
import { Page } from "@/components/page";
import {
  Panel,
  PanelContent,
  PanelTitle,
  PanelTrigger,
} from "@/components/panel";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import { Searchbar } from "@/components/searchbar";
import {
  Actions,
  ActionsButton,
  ActionsContent,
  ActionsGroup,
  ActionsLabel,
  ActionsTitle,
  ActionsTrigger,
} from "./actions";

const meta = {
  title: "Mobile/Overlays & Inputs",
  component: Actions,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Actions>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Action sheet, popover, panel, searchbar, FAB, badge, dan block. Ganti "Style" di toolbar. */
export const Default: Story = {
  render: () => {
    const [query, setQuery] = useState("");

    return (
      <div className="relative h-[640px] w-[360px] overflow-hidden rounded-3xl border border-border">
        <Page>
          <BlockTitle>Pencarian</BlockTitle>
          <Block>
            <Searchbar
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onClear={() => setQuery("")}
            />
          </Block>

          <BlockTitle>
            Overlay <Badge>3</Badge>
          </BlockTitle>
          <Block className="gap-2 flex flex-wrap">
            <Actions>
              <ActionsTrigger asChild>
                <Button>Actions</Button>
              </ActionsTrigger>
              <ActionsContent>
                <ActionsTitle>Aksi aset</ActionsTitle>
                <ActionsGroup>
                  <ActionsLabel>Pilih aksi untuk Tangki T-101</ActionsLabel>
                  <ActionsButton bold>Lihat detail</ActionsButton>
                  <ActionsButton>Bagikan</ActionsButton>
                </ActionsGroup>
                <ActionsGroup>
                  <ActionsButton>Batal</ActionsButton>
                </ActionsGroup>
              </ActionsContent>
            </Actions>

            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline">Popover</Button>
              </PopoverTrigger>
              <PopoverContent showArrow>
                <Block nested className="my-0 py-3">
                  Isi popover
                </Block>
              </PopoverContent>
            </Popover>

            <Panel>
              <PanelTrigger asChild>
                <Button variant="tonal">Panel</Button>
              </PanelTrigger>
              <PanelContent floating>
                <PanelTitle>Menu</PanelTitle>
                <Block>Isi panel samping.</Block>
              </PanelContent>
            </Panel>
          </Block>
        </Page>

        <Fab
          aria-label="Tambah"
          icon={<PlusIcon className="size-6" />}
          className="right-4 bottom-4 absolute"
        />
      </div>
    );
  },
};
