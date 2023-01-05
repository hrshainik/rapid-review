import DashboardShell from "@/components/DashboardShell";
import Review from "@/components/Review";
import SiteHeader from "@/components/SiteHeader";
import { useAuth } from "@/lib/auth";
import { createReview } from "@/lib/db";
import { getAllReview, getAllSite } from "@/lib/db-admin";
import { Box, Button, FormControl, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";

export async function getStaticPaths() {
  const { sites, error } = await getAllSite();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { reviews, error } = await getAllReview(params.siteId);

  return {
    props: { reviews },
  };
}

const SiteReview = ({ reviews }) => {
  const [allReviews, setAllReviews] = useState(reviews);
  // console.log(allReviews);
  const { user } = useAuth();
  // console.log(user);
  const router = useRouter();
  const inputEl = useRef(null);

  const onSubmit = (e) => {
    e.preventDefault();

    const newReview = {
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId,
      provider: user.provider,
      text: inputEl.current.value,
      createdAt: new Date().toISOString(),
      status: "pending",
      rating: 5,
    };

    setAllReviews([newReview, ...allReviews]);

    createReview(newReview);
  };
  return (
    <DashboardShell>
      <SiteHeader
      // isSiteOwner={site?.authorId === user?.uid}
      // site={site}
      // siteId={siteId}
      // route={route}
      />
      <Box
        display="flex"
        mx={4}
        flexDirection="column"
        width="full"
        maxWidth="700px"
      >
        <Box as="form" onSubmit={onSubmit}>
          <FormControl mb={8}>
            <Textarea
              ref={inputEl}
              id="comment"
              placeholder="Leave a comment"
              isDisabled={!user}
              h="100px"
            />
            <Button mt={2} fontWeight="medium" type="submit">
              Add Review
            </Button>
          </FormControl>
        </Box>
        {allReviews &&
          allReviews.map((review, index) => (
            <Review
              key={review.id}
              // settings={site?.settings}
              isLast={index === allReviews.length - 1}
              {...review}
            />
          ))}
      </Box>
    </DashboardShell>
  );
};

export default SiteReview;
