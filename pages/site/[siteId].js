import DashboardShell from "@/components/DashboardShell";
import Review from "@/components/Review";
import SiteHeader from "@/components/SiteHeader";
import { useAuth } from "@/lib/auth";
import { createReview } from "@/lib/db";
import { getAllReview, getAllSite } from "@/lib/db-admin";
import { Box, Button, FormControl, Text, Textarea } from "@chakra-ui/react";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

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
    revalidate: 1,
  };
}

const SiteReview = ({ reviews }) => {
  const [allReviews, setAllReviews] = useState(reviews);
  const { user } = useAuth();
  const router = useRouter();
  const inputEl = useRef(null);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ comment }) => {
    const newReview = {
      author: user.name,
      authorId: user.uid,
      siteId: router.query.siteId,
      provider: user.provider,
      text: comment,
      createdAt: new Date().toISOString(),
      status: "pending",
      rating: 5,
    };

    setAllReviews([newReview, ...allReviews]);

    createReview(newReview);
    reset();
  };
  return (
    <DashboardShell>
      <SiteHeader
      // isSiteOwner={site?.authorId === user?.uid}
      // site={site}
      // siteId={siteId}
      // route={route}
      />
      <Box display="flex" flexDirection="column" width="full" maxWidth="700px">
        <Box as="form" onSubmit={handleSubmit(onSubmit)}>
          <FormControl mb={8}>
            <Textarea
              id="comment"
              placeholder="Leave a review"
              isDisabled={!user}
              h="100px"
              {...register("comment", {
                required: "Comment is required",
                // pattern: {
                //   value: /^[a-zA-Z0-9]+$/,
                //   message: "Pattern problem",
                // },
              })}
            />
            {errors.comment && (
              <Text color="red.400">{errors.comment.message}</Text>
            )}
            <Button
              type="submit"
              // isDisabled={!siteData || !feedbackData}
              backgroundColor="gray.900"
              color="white"
              fontWeight="medium"
              mt={4}
              _hover={{ bg: "gray.700" }}
              _active={{
                bg: "gray.800",
                transform: "scale(0.95)",
              }}
            >
              Leave Review
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
