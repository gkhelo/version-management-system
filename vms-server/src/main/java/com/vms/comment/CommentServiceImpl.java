package com.vms.comment;

import com.vms.comment.repository.CommentRepository;
import com.vms.exceptions.VMSException;
import com.vms.model.version.Comment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.lang.String.format;

@Service
public class CommentServiceImpl implements CommentService {

	@Autowired
	private CommentRepository commentRepository;

	@Override
	public List<Comment> getVersionComments(long versionId) {
		return commentRepository.findByAppVersionIdAndParentIsNull(versionId, Sort.by("createTime"));
	}

	@Override
	public Comment getComment(long commentId) {
		return commentRepository.findById(commentId).orElse(null);
	}

	@Override
	public Comment addComment(Comment comment) {
		return commentRepository.save(comment);
	}

	@Override
	public Comment updateComment(long commentId, String text) {
		Comment comment = commentRepository.findById(commentId).orElseThrow(
			() -> new VMSException(format("Comment with id %s does not exist", commentId))
		);
		comment.setText(text);

		return commentRepository.save(comment);
	}

	@Override
	public void deleteComment(long commentId) {
		Comment comment = commentRepository.findById(commentId).orElseThrow(
			() -> new VMSException(format("Comment with id %s does not exist", commentId))
		);

		if (comment.getParent() != null) {
			comment.getParent().getReplies().removeIf(c -> c.getId() == commentId);
			commentRepository.save(comment.getParent());
		}

		commentRepository.delete(comment);
	}
}
