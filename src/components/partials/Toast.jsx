"use client"

import Swal from "sweetalert2";

const SwalToast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.onmouseenter = Swal.stopTimer;
    toast.onmouseleave = Swal.resumeTimer;
  }
});

export const Toast = (icon, title) => {
  SwalToast.fire({
    icon,
    title,
  });
};