package com.vms.comment;

import com.vms.model.version.Comment;

import java.util.List;

public interface CommentService {

	List<Comment> getVersionComments(long versionId);

	Comment getComment(long commentId);

	Comment addComment(Comment comment);

	Comment updateComment(long commentId, String text);

	void deleteComment(long commentId);
}
