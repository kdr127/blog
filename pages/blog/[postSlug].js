import { getComments } from "@/lib/comments";
import { getPostSlugs, getSinglePost } from "@/lib/posts";

import Head from "next/head";
import Image from "next/image";

import CommentForm from "@/components/CommentForm";
import Date from "@/components/Date";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export async function getStaticProps({ params }) {
  const postData = await getSinglePost(params.postSlug);
  const { comments, commentCount } = await getComments(params.postSlug);

  //TODO secret
  let featuredImageUrl =
    "https://wp.kksen.de/wp-content/uploads/img9-scaled.jpg";

  if (postData.featuredImage) {
    featuredImageUrl =
      postData.featuredImage.node.mediaDetails.sizes[0].sourceUrl;
  }

  if (!postData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      postData: postData,
      featuredImageUrl: "url(" + featuredImageUrl + ")",
      comments: comments,
      commentCount: commentCount,
    },
    notFound: false,
  };
}

export async function getStaticPaths() {
  const postSlugs = await getPostSlugs();

  return {
    paths: postSlugs.map((s) => ({
      params: {
        postSlug: s.slug,
      },
    })),
    fallback: "blocking",
  };
}

export default function Post({
  postData: postData,
  featuredImageUrl: featuredImageUrl,
  comments,
  commentCount,
}) {
  return (
    <>
      <Head>
        <title key={postData.slug}>{postData.title}</title>
        <meta
          name="description"
          content={postData.excerpt}
          key="metadescription"
        />
      </Head>

      <section className="bg-slate-700 bg-opacity-70 absolute w-full z-20">
        <SiteHeader className="header-single-post z-10 relative" />
      </section>

      <article>
        <section
          className="hero-area h-[60vh] min-h-[30rem] bg-no-repeat bg-cover bg-center relative"
          style={{ backgroundImage: featuredImageUrl }}
        >
          <div className="absolute inset-0 bg-slate-900 opacity-40">
            <div className="container mx-auto h-full flex flex-col justify-center lg:max-w-4xl">
              <h1 className="text-6xl text-center text-slate-100 relative z-10 py-4 mt-10">
                {postData.title}
              </h1>

              <div className="pb-4 text-slate-100 z-10">
                Posted by kdr, last updated on //TODO check author
                <Date dateString={postData.modified} />
              </div>

              <div
                dangerouslySetInnerHTML={{ __html: postData.excerpt }}
                className="relative z-10 text-left text-slate-200 text-2xl pl-4 border-l-4 border-lime-200"
              ></div>
            </div>
          </div>
        </section>

        <section className="content-area py-8">
          <div
            dangerouslySetInnerHTML={{ __html: postData.content }}
            className="post-content container lg:max-w-4xl mx-auto"
          ></div>
        </section>
      </article>

      <div className="container mx-auto lg:max-w-4xl">
        <h3 className="text-xl py-2 my-4 border-l-4 border-l-lime-300">
          {commentCount ? commentCount : "Nope"} comments on this post
        </h3>
        <CommentForm postId={postData.databaseId} />
      </div>

      <div className="container mx-auto lg:max-w-4xl">
        <section>
          <ul>
            {comments.nodes.map((comment) => (
              <li key={comment.id} className="pb-4 border-b">
                <div className="comment-header flex justify-start items-center">
                  <div className="py-4 max-w-12 mr-4">
                    {/* src="https://wp.kksen.de/wp-content/uploads/user_icon_001-scaled.jpg" */}
                    <Image
                      src={comment.author.node.avatar.url}
                      alt="placeholder"
                      width={comment.author.node.avatar.width}
                      height={comment.author.node.avatar.height}
                    />
                  </div>
                  <div>
                    <div className="font-bold">{comment.author.node.name}</div>
                    <div className="text-sm">
                      <Date dateString={comment.date} />
                    </div>
                  </div>
                </div>
                <div className="comment-body pl-[66px]">
                  <div
                    dangerouslySetInnerHTML={{ __html: comment.content }}
                  ></div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </div>

      <SiteFooter />
    </>
  );
}
