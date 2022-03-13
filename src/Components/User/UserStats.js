import React, { lazy, Suspense, useEffect } from "react";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";
import useFetch from "../../Hooks/useFetch";
import { STATS_GET } from "../../Utils/api";

const UserStatsGraphs = lazy(() => import("./UserStatsGraphs"));

const UserStats = () => {
  const { data, loading, error, request } = useFetch();
  useEffect(() => {
    (async () => {
      const token = window.localStorage.getItem("token");
      const { url, options } = STATS_GET(token);
      await request(url, options);
    })();
  }, [request]);

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!data) return null;
  return (
    <Suspense fallback={<Loading />}>
      <Head title="Statistics" />
      <UserStatsGraphs data={data} />
    </Suspense>
  );
};

export default UserStats;
