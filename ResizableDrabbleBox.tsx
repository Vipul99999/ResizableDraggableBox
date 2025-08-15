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

export default function ResizableDraggableBox() {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);
  const [top, setTop] = useState(100);
  const [left, setLeft] = useState(100);

  const resizingRef = useRef<{
    direction: ResizeDirection;
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startTop: number;
    startLeft: number;
  }>({
    direction: null,
    startX: 0,
    startY: 0,
    startWidth: 0,
    startHeight: 0,
    startTop: 0,
    startLeft: 0,
  });

  const draggingRef = useRef<{
    dragging: boolean;
    startX: number;
    startY: number;
    startTop: number;
    startLeft: number;
  }>({
    dragging: false,
    startX: 0,
    startY: 0,
    startTop: 0,
    startLeft: 0,
  });

  function onResizeMouseDown(e: React.MouseEvent, direction: ResizeDirection) {
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
  }

  function onResizeMouseMove(e: MouseEvent) {
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

    const minSize = 50;

    switch (direction) {
      case "right":
        newWidth = Math.max(minSize, startWidth + dx);
        break;
      case "left":
        newWidth = Math.max(minSize, startWidth - dx);
        newLeft = startLeft + dx;
        break;
      case "bottom":
        newHeight = Math.max(minSize, startHeight + dy);
        break;
      case "top":
        newHeight = Math.max(minSize, startHeight - dy);
        newTop = startTop + dy;
        break;
      case "top-left":
        newWidth = Math.max(minSize, startWidth - dx);
        newLeft = startLeft + dx;
        newHeight = Math.max(minSize, startHeight - dy);
        newTop = startTop + dy;
        break;
      case "top-right":
        newWidth = Math.max(minSize, startWidth + dx);
        newHeight = Math.max(minSize, startHeight - dy);
        newTop = startTop + dy;
        break;
      case "bottom-left":
        newWidth = Math.max(minSize, startWidth - dx);
        newLeft = startLeft + dx;
        newHeight = Math.max(minSize, startHeight + dy);
        break;
      case "bottom-right":
        newWidth = Math.max(minSize, startWidth + dx);
        newHeight = Math.max(minSize, startHeight + dy);
        break;
    }

    setWidth(newWidth);
    setHeight(newHeight);
    setTop(newTop);
    setLeft(newLeft);
  }

  function onResizeMouseUp() {
    resizingRef.current.direction = null;
    window.removeEventListener("mousemove", onResizeMouseMove);
    window.removeEventListener("mouseup", onResizeMouseUp);
  }

  function onDragMouseDown(e: React.MouseEvent) {
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
  }

  function onDragMouseMove(e: MouseEvent) {
    if (!draggingRef.current.dragging) return;

    const dx = e.clientX - draggingRef.current.startX;
    const dy = e.clientY - draggingRef.current.startY;

    setTop(draggingRef.current.startTop + dy);
    setLeft(draggingRef.current.startLeft + dx);
  }

  function onDragMouseUp() {
    draggingRef.current.dragging = false;
    window.removeEventListener("mousemove", onDragMouseMove);
    window.removeEventListener("mouseup", onDragMouseUp);
  }

  return (
    <div className="relative h-screen w-full  bg-green-300"
     >
      <div
        className="absolute  text-white p-2.5 border-white-900 animate-bounceCustom select-none overflow-hidden"
        style={{ width, height, top, left, backgroundColor:"red" }}
        onMouseDown={onDragMouseDown}
      >
        <div className="p-4 cursor-move   overflow-hidden">Drag me  hi i am vipul Kumar Patel Drag me  hi i am vipul Drag me  hi i am vipulDrag me  hi i am vipulDrag me  hi i am vipulDrag me  hi i am vipul or resize me!</div>

       
        {/* Side handles */}
        <div
          className="absolute top-0 left-0 right-0 border-1 cursor-n-resize border-white-700 opacity-80 z-50"
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeMouseDown(e, "top");
          }}
        />
        <div
          className="absolute top-0 right-0 bottom-0 border-1 cursor-e-resize bg-blue-700 opacity-80 z-50 "
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeMouseDown(e, "right");
          }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 border-1 cursor-s-resize bg-blue-700 opacity-80 z-50 "
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeMouseDown(e, "bottom");
          }}
        />
        <div
          className="absolute top-0 left-0 bottom-0 border-1 cursor-w-resize bg-blue-700 opacity-80 z-50"
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeMouseDown(e, "left");
          }}
        />

        {/* Corner handles == handle each corner to resize*/}
         <div
          className="absolute top-0 left-0  w-1 h-0 cursor-nw-resize bg-white-900 opacity-90 z-50"
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeMouseDown(e, "top-left");
          }}
        />
        <div
          className="absolute top-0 right-0  w-1 h-0 cursor-ne-resize bg-white-900 opacity-90 z-50"
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeMouseDown(e, "top-right");
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-1 h-0 cursor-sw-resize bg-white-900 opacity-90 z-50"
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeMouseDown(e, "bottom-left");
          }}
        />
        <div
          className="absolute bottom-0 right-0 w-1 h-0 cursor-se-resize bg-white-900 opacity-90 z-50"
          onMouseDown={(e) => {
            e.stopPropagation();
            onResizeMouseDown(e, "bottom-right");
          }}
        /> 
      </div> 
    </div>
  );
}
