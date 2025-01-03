import React from 'react'
import { Card } from '../../ui/dashboard/cards'
import RevenueChart from '../../ui/dashboard/revenue-chart'
import LatestInvoices from '../../ui/dashboard/latest-invoices'
import { lusitana } from '../../ui/fonts'
import { fetchCardData, fetchLatestInvoices } from '../../lib/data'
import { Suspense } from 'react'
import { CardSkeleton, RevenueChartSkeleton } from '@/app/ui/skeletons'
import { LatestInvoicesSkeleton } from '@/app/ui/skeletons'
import CardWrapper from '../../ui/dashboard/cards'


const Page = async () => {
    // const revenue = await fetchRevenue()
    // const latestInvoices = await fetchLatestInvoices()
    // const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } = await fetchCardData()

    const [cardData] = await Promise.all([
        fetchCardData()
    ])

    const { numberOfCustomers, numberOfInvoices, totalPaidInvoices, totalPendingInvoices } = cardData


    return (
        <main>
            <h1 className={`${lusitana.className} mb-4 text-xl md:text-2xl`}>
                Dashboard
            </h1>
            <Suspense fallback={<CardSkeleton />}>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <Card title="Collected" value={totalPaidInvoices} type="collected" />
                    <Card title="Pending" value={totalPendingInvoices} type="pending" />
                    <Card title="Total Invoices" value={numberOfInvoices} type="invoices" />
                    <Card
                        title="Total Customers"
                        value={numberOfCustomers}
                        type="customers"
                    />
                </div>
            </Suspense>
            <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                <Suspense fallback={<RevenueChartSkeleton />}>
                    <RevenueChart />
                </Suspense>
                <Suspense fallback={<LatestInvoicesSkeleton />}>
                    <LatestInvoices />
                </Suspense>
            </div>
        </main>
    );
}

export default Page