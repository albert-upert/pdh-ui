import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Button } from "@/components/button";
import { Card, CardContent } from "@/components/card";
import {
  ArrowLeftIcon,
  HomeIcon,
  ListIcon,
  ProfileIcon,
  SettingIcon,
} from "@/components/icon";
import { List, ListGroupTitle, ListItem } from "@/components/list";
import { Navbar } from "@/components/navbar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/sheet";
import { Switch } from "@/components/switch";
import { Tabbar, TabbarLink } from "@/components/tabbar";
import { Page } from "./page";

const meta = {
  title: "Mobile/App Shell",
  component: Page,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

const TABS = [
  { id: "home", label: "Beranda", icon: HomeIcon },
  { id: "assets", label: "Aset", icon: ListIcon },
  { id: "profile", label: "Profil", icon: ProfileIcon },
  { id: "settings", label: "Setelan", icon: SettingIcon },
] as const;

/**
 * Kerangka aplikasi mobile: Page + Navbar + List + Tabbar + Sheet.
 * Ganti "Style" di toolbar Storybook (iOS / Material) untuk membandingkan.
 */
export const Default: Story = {
  render: () => {
    const [tab, setTab] = useState<string>("home");
    const [notify, setNotify] = useState(true);

    return (
      <div className="relative h-[640px] w-[360px] overflow-hidden rounded-3xl border border-border">
        <Page>
          <Navbar
            title="PDH"
            subtitle="Digital Twin"
            left={
              <Button variant="tertiary" size="icon" aria-label="Kembali">
                <ArrowLeftIcon />
              </Button>
            }
          />

          <Card className="mx-4 my-4 py-4">
            <CardContent>
              <div className="text-base font-semibold">Tangki T-101</div>
              <div className="text-sm text-muted-foreground">
                Level 72% - Pertalite
              </div>
            </CardContent>
          </Card>

          <List strong inset>
            <ListGroupTitle>Ringkasan</ListGroupTitle>
            <ListItem
              title="Lokasi"
              after="Plumpang"
              chevron
              onClick={() => {}}
            />
            <ListItem
              title="Produk"
              subtitle="Pertalite"
              after="72%"
              chevron
              onClick={() => {}}
            />
            <ListItem
              title="Notifikasi"
              after={<Switch checked={notify} onCheckedChange={setNotify} />}
            />
          </List>

          <div className="px-4 pb-32">
            <Sheet>
              <SheetTrigger asChild>
                <Button className="w-full">Buka sheet</Button>
              </SheetTrigger>
              <SheetContent>
                <SheetTitle>Pilih lokasi</SheetTitle>
                <SheetDescription>
                  Pilih terminal yang ingin dilihat.
                </SheetDescription>
                <List className="my-4">
                  <ListItem title="Plumpang" onClick={() => {}} />
                  <ListItem title="Balongan" onClick={() => {}} />
                  <ListItem title="Dumai" onClick={() => {}} />
                </List>
              </SheetContent>
            </Sheet>
          </div>
        </Page>

        <div className="inset-x-0 bottom-0 absolute">
          <Tabbar icons labels>
            {TABS.map(({ id, label, icon: Icon }) => (
              <TabbarLink
                key={id}
                active={tab === id}
                onClick={() => setTab(id)}
                icon={<Icon className="size-6" />}
                label={label}
              />
            ))}
          </Tabbar>
        </div>
      </div>
    );
  },
};
