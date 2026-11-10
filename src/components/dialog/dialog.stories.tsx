import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { Block } from "@/components/block";
import { Button } from "@/components/button/button";
import { InfoIcon } from "@/components/icon";
import { List, ListItem } from "@/components/list";
import { Radio } from "@/components/radio";
import {
  Dialog,
  DialogBody,
  DialogButton,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";

const meta = {
  title: "Components/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    modal: {
      control: "boolean",
      description: "Whether the dialog uses a modal overlay",
    },
    open: {
      control: "boolean",
      description: "Controlled open state",
    },
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Dialog</Button>
      </DialogTrigger>
      <DialogContent side="center" showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Tunggu Sebentar</DialogTitle>
          <InfoIcon className="right-5 size-8 absolute text-muted-foreground" />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Apakah anda yakin informasi anda sudah benar?
          </DialogDescription>
          <DialogFooter>
            <Button
              variant="outline"
              size="lg"
              className="w-full border-destructive text-destructive hover:bg-destructive/10"
            >
              Cek Kembali
            </Button>
            <Button variant="primary" size="lg" className="w-full">
              Ya, Simpan Sekarang
            </Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const ConfirmationDialog: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Show Confirmation</Button>
      </DialogTrigger>
      <DialogContent
        side="center"
        showCloseButton={false}
        className="max-w-[542px]"
      >
        <DialogHeader>
          <DialogTitle>Tunggu Sebentar</DialogTitle>
          <InfoIcon className="right-5 size-8 absolute text-muted-foreground" />
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            Apakah anda yakin informasi anda sudah benar?
          </DialogDescription>
          <DialogFooter className="w-full">
            <Button
              variant="outline"
              size="lg"
              className="flex-1 border-destructive text-destructive hover:bg-destructive/10"
            >
              Cek Kembali
            </Button>
            <Button variant="primary" size="lg" className="flex-1">
              Ya, Simpan Sekarang
            </Button>
          </DialogFooter>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const LeftSide: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Left Dialog</Button>
      </DialogTrigger>
      <DialogContent side="left">
        <DialogHeader>
          <DialogTitle>Left Side Dialog</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This dialog slides in from the left side.
          </DialogDescription>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const RightSide: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Right Dialog</Button>
      </DialogTrigger>
      <DialogContent side="right">
        <DialogHeader>
          <DialogTitle>Right Side Dialog</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This dialog slides in from the right side.
          </DialogDescription>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

export const TopSide: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Open Top Dialog</Button>
      </DialogTrigger>
      <DialogContent side="top">
        <DialogHeader>
          <DialogTitle>Top Side Dialog</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <DialogDescription>
            This dialog slides in from the top.
          </DialogDescription>
        </DialogBody>
      </DialogContent>
    </Dialog>
  ),
};

/** Gaya Konsta: dikendalikan lewat `opened`. Ganti "Style" di toolbar. */
export const Konsta: Story = {
  render: () => {
    const [open, setOpen] = useState<
      "basic" | "alert" | "confirm" | "list" | null
    >(null);
    const [hero, setHero] = useState("batman");
    const close = () => setOpen(null);

    return (
      <div className="w-[360px]">
        <Block strong inset className="space-y-4">
          <p>
            Dialog adalah jendela modal yang muncul di depan konten aplikasi
            untuk menyampaikan informasi penting atau meminta keputusan.
          </p>
          <div className="gap-4 grid grid-cols-2">
            <Button onClick={() => setOpen("basic")}>Basic</Button>
            <Button onClick={() => setOpen("alert")}>Alert</Button>
            <Button onClick={() => setOpen("confirm")}>Confirm</Button>
            <Button onClick={() => setOpen("list")}>List</Button>
          </div>
        </Block>

        <Dialog
          opened={open === "basic"}
          onBackdropClick={close}
          title="Judul Dialog"
          content="Dialog adalah jendela modal yang muncul di depan konten aplikasi untuk menyampaikan informasi penting, atau meminta keputusan."
          buttons={
            <>
              <DialogButton onClick={close}>Aksi 2</DialogButton>
              <DialogButton strong onClick={close}>
                Aksi 1
              </DialogButton>
            </>
          }
        />
        <Dialog
          opened={open === "alert"}
          onBackdropClick={close}
          title="PDH"
          content="Halo dunia!"
          buttons={
            <DialogButton strong onClick={close}>
              Oke
            </DialogButton>
          }
        />
        <Dialog
          opened={open === "confirm"}
          onBackdropClick={close}
          title="PDH"
          content="Semua baik hari ini?"
          buttons={
            <>
              <DialogButton onClick={close}>Tidak</DialogButton>
              <DialogButton strong onClick={close}>
                Ya
              </DialogButton>
            </>
          }
        />
        <Dialog
          opened={open === "list"}
          onBackdropClick={close}
          title="Pahlawan super Anda"
          content={
            <List className="-mx-4 my-0 text-start">
              {[
                ["batman", "Batman"],
                ["spiderman", "Spider-man"],
                ["hulk", "Hulk"],
              ].map(([value, label]) => (
                <ListItem
                  key={value}
                  label
                  title={label}
                  after={
                    <Radio
                      component="div"
                      value={value}
                      checked={hero === value}
                      onChange={() => setHero(value)}
                    />
                  }
                />
              ))}
            </List>
          }
          buttons={
            <DialogButton strong onClick={close}>
              Konfirmasi
            </DialogButton>
          }
        />
      </div>
    );
  },
};
