import BarChart from "../components/ui/BarChart";
import PageTitle from "../components/ui/PageTitle";
import Card, { CardContent } from "../components/ui/card.tsx";
import { Activity, CreditCard, DollarSign, Users } from "lucide-react";
import SalesCard from "../components/ui/SalesCard";
import {ScrollArea} from "../components/ui/scroll-area";

const cardData = [
  {
    label: "Target",
    amount: "150",
    discription: "+20.1% from last month",
    icon: Users
  },
  {
    label: "Registrations",
    amount: "100",
    discription: "+180.1% from last month",
    icon: Users
  },
  {
    label: "Confirmed Registrations",
    amount: "52",
    discription: "+19% from last month",
    icon: CreditCard
  },
  {
    label: "Unconfirmed Registrations",
    amount: "48",
    discription: "+201 from last month",
    icon: Activity
  },
  
]

const userSalesData = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    salesAmount: "Unpaid"
  },
  {
    name: "Jackson Lee",
    email: "isabella.nguyen@email.com",
    salesAmount: "Paid"
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    salesAmount: "Paid"
  },
  {
    name: "William Kim",
    email: "will@email.com",
    salesAmount: "Unpaid"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    salesAmount: "Paid"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    salesAmount: "Paid"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    salesAmount: "Paid"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    salesAmount: "Paid"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    salesAmount: "Paid"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    salesAmount: "Paid"
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    salesAmount: "Paid"
  }
];


export default function Home({data}) {

  // const confirmed = () => {
  //   let confirmed_reg = 0;
  //   if (data?.contingent_data?.registered_users?.length > 0) {
  //     data.contingent_data.registered_users.forEach((user) => {
  //       if (user.payment_status === true) {
  //         confirmed_reg += 1;
  //       }
  //     });
  //   }
  //   return confirmed_reg;
  // };

  const confirmed = () => {
    return data?.registered_users?.filter(user => user.payment_status === true).length;
  };
  
  // console.log(confirmed());

  // console.log(data);
  return (
    <div className="flex flex-col gap-5 w-full overflow-auto">
      <PageTitle title="Dashboard"/>
      <section  className="flex justify-center sm:flex-nowrap flex-wrap gap-10">
        {/* {cardData.map((data, index) => (
          <Card 
            key={index}
            amount={data.amount}
            discription={data.discription}
            icon={data.icon}
            label={data.label}
          />
        ))} */}

        {/* <Card
            amount={data.contingent_data.target_regs}
            description="Target"
            icon={Users}
            label="Target" 
            discription={data.contingent_data.insti} 
              /> */}
        <Card
          amount={data?.contingent_data?.no_of_regs || 0}
          description="No.of Regs"
          icon={Users}
          label="No.of Regs" 
          discription={data.contingent_data.insti} 
            />
        <Card
          amount={confirmed()}
          description="Confirmed Regs"
          icon={Users}
          label="Confirmed Regs" 
          discription={data.contingent_data.insti} 
            />
        <Card
          amount={data.contingent_data.no_of_regs-confirmed()}
          description="Unconfirmed Regs"
          icon={Users}
          label="Unconfirmed Regs" 
          discription={data.contingent_data.insti} 
            />

      </section>

      <section className="grid grid-cols-1 gap-4 transition-all lg:grid-cols-2">
        <CardContent>
          <p className="p-4 font-semibold">Overview</p>
          <BarChart/>
        </CardContent>
        <CardContent className="flex justify-between gap-4">
          <section>
            <p>Recent Registrations</p>
            <p className="text-sm text-gray-400">
              You made {data?.contingent_data?.no_of_regs || 0} Registrations.
            </p>
          </section>
          {/* {userSalesData.map((data, index) => (
            <SalesCard
              key={index}
              email={data.email}
              name={data.name}
              salesAmount={data.salesAmount}
              
            />
          ))} */}
            <ScrollArea className="max-h-96">
            {userSalesData.map((data, index) => (
            <SalesCard
                key={index}
                email={data.email}
                name={data.name}
                salesAmount={data.salesAmount}
            />
            ))}

            {
              data.registered_users?.map((user, index) => (
                <SalesCard
                  key={index}
                  email={user?.email || "email"}
                  name={user?.first_name || "first_name"}
                  salesAmount={user.payment_status ? "Paid" : "UnPaid"}
                />
              ))
            }

        </ScrollArea>
        </CardContent>
      </section>
    </div>
  )
}




