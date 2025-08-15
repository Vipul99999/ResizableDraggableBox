"use client";

import React, { useState, useRef } from "react";

type ResizeDirection =
  | "top"
  | "right"
  | "bottom"
  | "left"
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | null;

type Props = {
  initialWidth?: number;
  initialHeight?: number;
  initialTop?: number;
  initialLeft?: number;
  minWidth?: number;
  minHeight?: number;
  children?: React.ReactNode;
};

export default function ResizableDraggableBox2({
  initialWidth = 300,
  initialHeight = 200,
  initialTop = 100,
  initialLeft = 100,
  minWidth = 50,
  minHeight = 50,
  children,
}: Props) {
  const [width, setWidth] = useState(initialWidth);
  const [height, setHeight] = useState(initialHeight);
  const [top, setTop] = useState(initialTop);
  const [left, setLeft] = useState(initialLeft);

  const resizingRef = useRef({
    direction: null as ResizeDirection,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startTop: 0,
    startLeft: 0,
  });

  const draggingRef = useRef({
    dragging: false,
    startX: 0,
    startY: 0,
    startTop: 0,
    startLeft: 0,
  });

  const onResizeMouseDown = (
    e: React.MouseEvent,
    direction: ResizeDirection
  ) => {
    e.preventDefault();
    e.stopPropagation();

    resizingRef.current = {
      direction,
      startX: e.clientX,
      startY: e.clientY,
      startWidth: width,
      startHeight: height,
      startTop: top,
      startLeft: left,
    };

    window.addEventListener("mousemove", onResizeMouseMove);
    window.addEventListener("mouseup", onResizeMouseUp);
  };

  const onResizeMouseMove = (e: MouseEvent) => {
    const {
      direction,
      startX,
      startY,
      startWidth,
      startHeight,
      startTop,
      startLeft,
    } = resizingRef.current;

    if (!direction) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    let newWidth = startWidth;
    let newHeight = startHeight;
    let newTop = startTop;
    let newLeft = startLeft;

    switch (direction) {
      case "right":
        newWidth = Math.max(minWidth, startWidth + dx);
        break;
      case "left":
        newWidth = Math.max(minWidth, startWidth - dx);
        newLeft = startLeft + dx;
        break;
      case "bottom":
        newHeight = Math.max(minHeight, startHeight + dy);
        break;
      case "top":
        newHeight = Math.max(minHeight, startHeight - dy);
        newTop = startTop + dy;
        break;
      case "top-left":
        newWidth = Math.max(minWidth, startWidth - dx);
        newLeft = startLeft + dx;
        newHeight = Math.max(minHeight, startHeight - dy);
        newTop = startTop + dy;
        break;
      case "top-right":
        newWidth = Math.max(minWidth, startWidth + dx);
        newHeight = Math.max(minHeight, startHeight - dy);
        newTop = startTop + dy;
        break;
      case "bottom-left":
        newWidth = Math.max(minWidth, startWidth - dx);
        newLeft = startLeft + dx;
        newHeight = Math.max(minHeight, startHeight + dy);
        break;
      case "bottom-right":
        newWidth = Math.max(minWidth, startWidth + dx);
        newHeight = Math.max(minHeight, startHeight + dy);
        break;
    }

    setWidth(newWidth);
    setHeight(newHeight);
    setTop(newTop);
    setLeft(newLeft);
  };

  const onResizeMouseUp = () => {
    resizingRef.current.direction = null;
    window.removeEventListener("mousemove", onResizeMouseMove);
    window.removeEventListener("mouseup", onResizeMouseUp);
  };

  const onDragMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    draggingRef.current = {
      dragging: true,
      startX: e.clientX,
      startY: e.clientY,
      startTop: top,
      startLeft: left,
    };

    window.addEventListener("mousemove", onDragMouseMove);
    window.addEventListener("mouseup", onDragMouseUp);
  };

  const onDragMouseMove = (e: MouseEvent) => {
    if (!draggingRef.current.dragging) return;

    const dx = e.clientX - draggingRef.current.startX;
    const dy = e.clientY - draggingRef.current.startY;

    setTop(draggingRef.current.startTop + dy);
    setLeft(draggingRef.current.startLeft + dx);
  };

  const onDragMouseUp = () => {
    draggingRef.current.dragging = false;
    window.removeEventListener("mousemove", onDragMouseMove);
    window.removeEventListener("mouseup", onDragMouseUp);
  };

  const resizeHandles = [
    { direction: "top", className: "top-0 left-0 right-0 h-2 cursor-n-resize" },
    {
      direction: "right",
      className: "top-0 bottom-0 right-0 w-2 cursor-e-resize",
    },
    {
      direction: "bottom",
      className: "bottom-0 left-0 right-0 h-2 cursor-s-resize",
    },
    {
      direction: "left",
      className: "top-0 bottom-0 left-0 w-2 cursor-w-resize",
    },
    {
      direction: "top-left",
      className: "top-0 left-0 w-3 h-3 cursor-nw-resize",
    },
    {
      direction: "top-right",
      className: "top-0 right-0 w-3 h-3 cursor-ne-resize",
    },
    {
      direction: "bottom-left",
      className: "bottom-0 left-0 w-3 h-3 cursor-sw-resize",
    },
    {
      direction: "bottom-right",
      className: "bottom-0 right-0 w-3 h-3 cursor-se-resize",
    },
  ];

  return (
    <div
  className="absolute bg-red-600 text-white border border-white shadow-md select-none overflow-hidden"
  style={{ width, height, top, left }}
  onMouseDown={onDragMouseDown}
>
  <div className="p-2 bg-red-700 cursor-move">Drag me or resize me</div>
  <div className="p-4">{children}</div>

  {resizeHandles.map((handle) => (
    <div
      key={handle.direction}
      className={`absolute ${handle.className} z-50 bg-white opacity-0 hover:opacity-50`}
      onMouseDown={(e) => {
        e.stopPropagation();
        onResizeMouseDown(e, handle.direction as ResizeDirection);
      }}
    />
  ))}
</div>

  );
}
