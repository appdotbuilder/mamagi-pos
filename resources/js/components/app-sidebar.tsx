import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem, type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, Package, Target, ShoppingCart, Users, DollarSign, Utensils, Gift } from 'lucide-react';


const footerNavItems: NavItem[] = [
    {
        title: 'GitHub',
        href: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        href: 'https://laravel.com/docs/starter-kits#react',
        icon: BookOpen,
    },
];

export function AppSidebar() {
    const { auth } = usePage<SharedData>().props;
    const user = auth.user;
    const isAdmin = user?.role === 'admin';
    const isAffiliate = user?.role === 'affiliate';

    // Main navigation items based on user role
    const getMainNavItems = (): NavItem[] => {
        const items: NavItem[] = [
            {
                title: 'Dashboard',
                href: '/dashboard',
                icon: LayoutGrid,
            },
        ];

        if (isAdmin) {
            items.push(
                {
                    title: 'Products',
                    href: '/products',
                    icon: Package,
                },
                {
                    title: 'Promotions',
                    href: '/promotions',
                    icon: Target,
                },
                {
                    title: 'Orders',
                    href: '/orders',
                    icon: ShoppingCart,
                },
                {
                    title: 'Affiliates',
                    href: '/affiliates',
                    icon: Users,
                }
            );
        } else if (isAffiliate) {
            items.push(
                {
                    title: 'Affiliate Dashboard',
                    href: '/affiliate/dashboard',
                    icon: DollarSign,
                },
                {
                    title: 'Browse Menu',
                    href: '/menu',
                    icon: Utensils,
                },
                {
                    title: 'Special Offers',
                    href: '/promotions',
                    icon: Gift,
                },
                {
                    title: 'My Orders',
                    href: '/my-orders',
                    icon: ShoppingCart,
                }
            );
        } else {
            // Regular user navigation
            items.push(
                {
                    title: 'Browse Menu',
                    href: '/menu',
                    icon: Utensils,
                },
                {
                    title: 'Special Offers',
                    href: '/promotions',
                    icon: Gift,
                },
                {
                    title: 'My Orders',
                    href: '/my-orders',
                    icon: ShoppingCart,
                },
                {
                    title: 'Become Affiliate',
                    href: '/affiliate/register',
                    icon: DollarSign,
                }
            );
        }

        return items;
    };

    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <div className="flex items-center space-x-2">
                                    <span className="text-2xl">🍽️</span>
                                    <div className="text-left">
                                        <div className="font-bold">mamagi</div>
                                        <div className="text-xs text-gray-500">POS System</div>
                                    </div>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={getMainNavItems()} />
                
                {/* Role badge */}
                <div className="px-4 py-2">
                    <div className="text-xs text-gray-500 mb-1">Current Role</div>
                    <span className={`inline-flex items-center px-2 py-1 text-xs font-medium rounded-full ${
                        isAdmin 
                            ? 'bg-red-100 text-red-800' 
                            : isAffiliate 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-blue-100 text-blue-800'
                    }`}>
                        {isAdmin ? '👨‍💼 Admin' : isAffiliate ? '💰 Affiliate' : '👤 Customer'}
                    </span>
                </div>
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}