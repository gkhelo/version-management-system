package com.vms.comment;

import com.vms.comment.dto.CommentDTO;
import com.vms.comment.mapper.CommentMapper;
import com.vms.model.version.Comment;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.annotation.Secured;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/comments")
@Secured({"ADMIN", "USER"})
@Tag(name = "Comments")
@SecurityRequirement(name = "bearerAuth")
public class CommentController {

	@Autowired
	private CommentService commentService;

	@Autowired
	private CommentMapper commentMapper;

	@GetMapping("/{versionId}")
	public List<CommentDTO> getVersionComments(@PathVariable("versionId") long versionId) {
		return commentMapper.toDTOs(commentService.getVersionComments(versionId));
	}

	@PostMapping("/add")
	public ResponseEntity<CommentDTO> addComment(@RequestBody CommentDTO commentDTO) {
		Comment comment = commentMapper.fromDTO(commentDTO);
		return ResponseEntity.ok(commentMapper.toDTO(commentService.addComment(comment)));
	}

	@PutMapping("/update")
	public ResponseEntity<CommentDTO> updateComment(@RequestParam("commentId") long commentId,
													@RequestParam("text") String text) {
		Comment comment = commentService.updateComment(commentId, text);
		return ResponseEntity.ok(commentMapper.toDTO(comment));
	}

	@DeleteMapping("/delete/{commentId}")
	public ResponseEntity<Void> deleteComment(@PathVariable("commentId") long commentId) {
		commentService.deleteComment(commentId);
		return ResponseEntity.ok().build();
	}
}
