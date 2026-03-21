import { Outlet, createRootRoute } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { ThemeProvider } from "@/components/theme-provider"



export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ThemeProvider defaultTheme='system' storageKey='vite-ui-theme'>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
      {/* <BottomNav items={NAV_ITEMS}/> */}
    </ThemeProvider>
  )
}
