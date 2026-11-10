import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Block, BlockTitle } from "@/components/block";
import { List, ListItem } from "@/components/list";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/popover";
import {
  Breadcrumbs,
  BreadcrumbsCollapsed,
  BreadcrumbsItem,
  BreadcrumbsSeparator,
} from "./breadcrumb";

const meta = {
  title: "Components/Breadcrumb",
  component: Breadcrumbs,
  parameters: { layout: "centered" },
  tags: ["autodocs"],
} satisfies Meta<typeof Breadcrumbs>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Ganti "Style" di toolbar Storybook untuk membandingkan iOS dan Material. */
export const Default: Story = {
  render: () => (
    <Breadcrumbs>
      <BreadcrumbsItem asChild>
        <a href="#">Beranda</a>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem asChild>
        <a href="#">Katalog</a>
      </BreadcrumbsItem>
      <BreadcrumbsSeparator />
      <BreadcrumbsItem active>iPhone 12</BreadcrumbsItem>
    </Breadcrumbs>
  ),
};

export const Scrollable: Story = {
  render: () => (
    <div className="w-64">
      <Breadcrumbs>
        <BreadcrumbsItem asChild>
          <a href="#">Beranda</a>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem asChild>
          <a href="#">Katalog</a>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem asChild>
          <a href="#">Ponsel</a>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem asChild>
          <a href="#">Apple</a>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem active>iPhone 12</BreadcrumbsItem>
      </Breadcrumbs>
    </div>
  ),
};

/** Tingkat tengah diringkas; klik titik-titik untuk membuka popover. */
export const Collapsed: Story = {
  render: () => {
    const [open, setOpen] = useState(false);

    return (
      <Breadcrumbs>
        <BreadcrumbsItem asChild>
          <a href="#">Beranda</a>
        </BreadcrumbsItem>
        <BreadcrumbsSeparator />
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <BreadcrumbsCollapsed />
          </PopoverTrigger>
          <PopoverContent className="w-32">
            <List className="my-0">
              {["Katalog", "Ponsel", "Apple"].map((title) => (
                <ListItem
                  key={title}
                  title={title}
                  onClick={() => setOpen(false)}
                />
              ))}
            </List>
          </PopoverContent>
        </Popover>
        <BreadcrumbsSeparator />
        <BreadcrumbsItem active>iPhone 12</BreadcrumbsItem>
      </Breadcrumbs>
    );
  },
};

export const InBlock: Story = {
  render: () => (
    <div className="w-80">
      <BlockTitle>Dasar</BlockTitle>
      <Block strong outline>
        <Breadcrumbs>
          <BreadcrumbsItem asChild>
            <a href="#">Beranda</a>
          </BreadcrumbsItem>
          <BreadcrumbsSeparator />
          <BreadcrumbsItem active>Pengumuman</BreadcrumbsItem>
        </Breadcrumbs>
      </Block>
    </div>
  ),
};
