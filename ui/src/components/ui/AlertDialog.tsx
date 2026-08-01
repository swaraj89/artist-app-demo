import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'

export const AlertDialog = AlertDialogPrimitive.Root
export const AlertDialogTrigger = AlertDialogPrimitive.Trigger
export const AlertDialogPortal = AlertDialogPrimitive.Portal
export const AlertDialogOverlay = React.forwardRef<
  HTMLDivElement,
  AlertDialogPrimitive.AlertDialogOverlayProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Overlay
    ref={ref}
    className={['fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
))

AlertDialogOverlay.displayName = AlertDialogPrimitive.Overlay.displayName

export const AlertDialogContent = React.forwardRef<
  HTMLDivElement,
  AlertDialogPrimitive.AlertDialogContentProps
>(({ className, ...props }, ref) => (
  <AlertDialogPortal>
    <AlertDialogOverlay />
    <AlertDialogPrimitive.Content
      ref={ref}
      className={['fixed left-[50%] top-[50%] z-50 min-w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-xl border border-slate-200 bg-white p-6 shadow-xl focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100', className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    />
  </AlertDialogPortal>
))

AlertDialogContent.displayName = AlertDialogPrimitive.Content.displayName

export const AlertDialogTitle = React.forwardRef<
  HTMLHeadingElement,
  AlertDialogPrimitive.AlertDialogTitleProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Title
    ref={ref}
    className={['text-lg font-semibold text-slate-950 dark:text-slate-50', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
))

AlertDialogTitle.displayName = AlertDialogPrimitive.Title.displayName

export const AlertDialogDescription = React.forwardRef<
  HTMLParagraphElement,
  AlertDialogPrimitive.AlertDialogDescriptionProps
>(({ className, ...props }, ref) => (
  <AlertDialogPrimitive.Description
    ref={ref}
    className={['mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400', className]
      .filter(Boolean)
      .join(' ')}
    {...props}
  />
))

AlertDialogDescription.displayName = AlertDialogPrimitive.Description.displayName

export const AlertDialogCancel = AlertDialogPrimitive.Cancel
export const AlertDialogAction = AlertDialogPrimitive.Action
