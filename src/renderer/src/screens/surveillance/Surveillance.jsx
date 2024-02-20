import React from "react";
import HeroSection from "../../components/heroSection/HeroSection";
import PolicieP from "../../images/deo/police.png";
import Layout from "../../Layout";
import RoleAuthorization from "../../components/hoc/AdminAuthorization";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { UserPlusIcon } from "@heroicons/react/24/solid";
import {
  Card,
  CardHeader,
  Input,
  Typography,
  Button,
  CardBody,
  Chip,
  CardFooter,
  Tabs,
  TabsHeader,
  Tab,
  Avatar,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const TABS = [
  {
    label: "All",
    value: "all",
  },
  {
    label: "Monitored",
    value: "monitored",
  },
  {
    label: "Unmonitored",
    value: "unmonitored",
  },
];

const TABLE_HEAD = ["Member", "Function", "entre", "sortir", "jour", ""];

const TABLE_ROWS = [
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-3.jpg",
    name: "John Michael",
    numero: "+243999999999",
    job: "Manager",
    org: "Organization",
    sortir: false,
    entre: true,
    date: "23/04/18",
    time: "12:30",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-2.jpg",
    name: "Alexa Liras",
    numero: "+243999999999",
    job: "Programator",
    org: "Developer",
    sortir: true,
    entre: false,
    date: "23/04/18",
    time: "12:30",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-1.jpg",
    name: "Laurent Perrier",
    numero: "+243999999999",
    job: "Executive",
    org: "Projects",
    sortir: false,
    entre: true,
    date: "19/09/17",
    time: "12:30",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-4.jpg",
    name: "Michael Levi",
    numero: "+243999999999",
    job: "Programator",
    org: "Developer",
    sortir: false,
    entre: true,
    date: "24/12/08",
    time: "12:30",
  },
  {
    img: "https://demos.creative-tim.com/test/corporate-ui-dashboard/assets/img/team-5.jpg",
    name: "Richard Gran",
    numero: "+243999999999",
    job: "Manager",
    org: "Executive",
    sortir: false,
    entre: true,
    date: "04/10/21",
    time: "12:30",
  },
];

const Surveillance = () => {
  return (
    <RoleAuthorization role={"entry-checker"}>
      <Layout>
        <div className=" p-16">
          <div className=" p-4">
            <HeroSection
              name="surveillance"
              nameService="surveillance"
              images={PolicieP}
            />
            <div>
              <h1 className="uppercase text-center font-semibold text-blue-500 p-8 text-[24px]">
                LISTE DES AGENTS
              </h1>
            </div>
            <div>
              <Card className="h-full dark:bg-blue-gray-500 w-full">
                <CardHeader
                  floated={false}
                  shadow={false}
                  className="rounded-none dark:bg-blue-gray-500"
                >
                  <div className="mb-8 flex items-center justify-between gap-8">
                    <div>
                      <Typography variant="h5" color="blue-gray">
                        liste journalier
                      </Typography>
                    </div>
                    <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                      <Button variant="outlined" size="sm">
                        view all
                      </Button>
                      <Button
                        className="flex items-center gap-3 bg-subMain"
                        size="sm"
                      >
                        <UserPlusIcon strokeWidth={2} className="h-4 w-4" />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                          />
                        </svg>
                      </Button>
                    </div>
                  </div>
                  <div className="flex flex-col  items-center justify-between gap-4 md:flex-row">
                    <Tabs value="all" className="w-full md:w-max ">
                      <TabsHeader>
                        {TABS.map(({ label, value }) => (
                          <Tab key={value} value={value}>
                            &nbsp;&nbsp;{label}&nbsp;&nbsp;
                          </Tab>
                        ))}
                      </TabsHeader>
                    </Tabs>
                    <div className="w-full md:w-72">
                      <Input
                        className=" dark:text-white"
                        label="Search"
                        icon={<MagnifyingGlassIcon className="h-5 w-5" />}
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardBody className="overflow-scroll  px-0">
                  <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                      <tr>
                        {TABLE_HEAD.map((head) => (
                          <th
                            key={head}
                            className="border-y border-blue-gray-100 bg-primary-500 p-4"
                          >
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal leading-none text-white opacity-70"
                            >
                              {head}
                            </Typography>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {TABLE_ROWS.map(
                        (
                          {
                            img,
                            name,
                            numero,
                            job,
                            org,
                            entre,
                            sortir,
                            date,
                            time,
                          },
                          index
                        ) => {
                          const isLast = index === TABLE_ROWS.length - 1;
                          const classes = isLast
                            ? "p-4"
                            : "p-4 border-b border-blue-gray-50";

                          return (
                            <tr key={name}>
                              <td className={classes}>
                                <div className="flex items-center gap-3">
                                  <Avatar src={img} alt={name} size="sm" />
                                  <div className="flex flex-col">
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal"
                                    >
                                      {name}
                                    </Typography>
                                    <Typography
                                      variant="small"
                                      color="blue-gray"
                                      className="font-normal opacity-70"
                                    >
                                      {numero}
                                    </Typography>
                                  </div>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="flex flex-col">
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal"
                                  >
                                    {job}
                                  </Typography>
                                  <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal opacity-70"
                                  >
                                    {org}
                                  </Typography>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="w-max">
                                  <Chip
                                    variant="ghost"
                                    size="sm"
                                    value={entre ? "entre" : "sortir"}
                                    color={entre ? "green" : "blue-gray"}
                                  />
                                  <p className="text-[12px] text-center">
                                    {time}
                                  </p>
                                </div>
                              </td>
                              <td className={classes}>
                                <div className="w-max">
                                  <Chip
                                    variant="ghost"
                                    size="sm"
                                    value={sortir ? "partir" : "sortir"}
                                    color={sortir ? "red" : "blue-gray"}
                                  />
                                  <p className="text-[12px] text-center">
                                    {time}
                                  </p>
                                </div>
                              </td>
                              <td className={classes}>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="font-normal"
                                >
                                  {date}
                                </Typography>
                              </td>
                              <td className={classes}>
                                <Tooltip content="Edit User">
                                  <IconButton variant="text">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke-width="1.5"
                                      stroke="currentColor"
                                      className="w-6 h-6"
                                    >
                                      <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        d="M7.864 4.243A7.5 7.5 0 0119.5 10.5c0 2.92-.556 5.709-1.568 8.268M5.742 6.364A7.465 7.465 0 004.5 10.5a7.464 7.464 0 01-1.15 3.993m1.989 3.559A11.209 11.209 0 008.25 10.5a3.75 3.75 0 117.5 0c0 .527-.021 1.049-.064 1.565M12 10.5a14.94 14.94 0 01-3.6 9.75m6.633-4.596a18.666 18.666 0 01-2.485 5.33"
                                      />
                                    </svg>
                                  </IconButton>
                                </Tooltip>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                </CardBody>
                <CardFooter className="flex items-center justify-between border-t border-blue-gray-50 p-4">
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    Page 1 of 10
                  </Typography>
                  <div className="flex gap-2">
                    <Button variant="outlined" size="sm">
                      Previous
                    </Button>
                    <Button variant="outlined" size="sm">
                      Next
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </Layout>
    </RoleAuthorization>
  );
};

export default Surveillance;
