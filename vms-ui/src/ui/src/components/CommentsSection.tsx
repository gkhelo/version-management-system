import { FC, useContext, useEffect, useState } from "react";
import { CommentSection } from "react-comments-section";
import "react-comments-section/dist/index.css";
import { Context as UserContext } from "../context/UserContext";
import { Comment } from "../types/Comment";
import ServerApi from "../api/ServerApi";

const avatarUrl = (name: any): string => {
  return `https://ui-avatars.com/api/name=${name}&background=random`;
}

const fromComment = (comment: Comment): any => {
  const replies = comment.replies.map(fromComment);
  return {
    comId: comment.id,
    userId: `${comment.author.id}`,
    fullName: comment.author.username,
    avatarUrl: avatarUrl(comment.author.username),
    text: comment.text,
    replies: replies
  };
};

const CommentsSection: FC<{ versionId: number }> = ({versionId}) => {
  const {
    state: {user},
  } = useContext(UserContext);

  const [comments, setComments] = useState<Comment[]>([]);

  const fetchComments = async () => {
    const fetchedComments = await ServerApi.getComments(versionId);
    setComments(fetchedComments);
  }

  useEffect(() => {
    fetchComments()
      .catch(err => {
        console.error("Comments fetch error", err);
      });
  }, [versionId])

  const onAddHandler = async (data: any) => {
    if (user) {
      const comment: Comment = {
        versionId: versionId,
        author: user,
        text: data.text,
        replies: []
      };

      await ServerApi.addComment(comment);
      await fetchComments();
    }
  };

  const onEditHandler = async (data: any) => {
    await ServerApi.updateComment(data.comId, data.text);
    await fetchComments();
  };

  const onDeleteHandler = async (data: any) => {
    await ServerApi.deleteComment(data.comIdToDelete);
    await fetchComments();
  }

  const onReplyHandler = async (data: any) => {
    if (user) {
      const comment: Comment = {
        versionId: versionId,
        author: user,
        text: data.text,
        parentId: data.repliedToCommentId,
        replies: []
      };

      await ServerApi.addComment(comment);
      await fetchComments();
    }
  }

  return <CommentSection
    logIn={{ loginLink: "", signupLink: "" }}
    currentUser={{
      currentUserId: user && user.id ? user.id.toString() : "",
      currentUserFullName: user && user.username ? user.username : "",
      currentUserImg: avatarUrl(user?.username),
      currentUserProfile: ""
    }}
    commentData={comments.map(fromComment)}
    onSubmitAction={onAddHandler}
    onEditAction={onEditHandler}
    onDeleteAction={onDeleteHandler}
    onReplyAction={onReplyHandler}
  />
}

export default CommentsSection;
