import { ArrowUp, BookOpen, CheckCircle2, Sparkles } from "lucide-react";

export function MoeAiPreview() {
  return (
    <div className="ai-stage" aria-label="Preview of MoeAI's tutoring experience">
      <div className="ai-glow" aria-hidden="true" />
      <section className="ai-window glass-panel">
        <header className="ai-window-header">
          <div className="ai-identity">
            <span className="ai-orb">
              <Sparkles size={16} aria-hidden="true" />
            </span>
            <span>
              <strong>MoeAI</strong>
              <small><i /> Curriculum connected</small>
            </span>
          </div>
          <span className="preview-label">Preview</span>
        </header>

        <div className="chat-thread">
          <div className="student-message">Why does a pointer store an address instead of the value?</div>
          <div className="tutor-message">
            <span className="tiny-orb"><Sparkles size={12} aria-hidden="true" /></span>
            <div>
              <p>
                Think of a pointer as a campus room number. The room number is not the student—it tells
                you exactly where to find them.
              </p>
              <div className="code-line"><span>int</span> score = 95; <em>{"// the value"}</em></div>
              <div className="code-line"><span>int*</span> ptr = &amp;score; <em>{"// its address"}</em></div>
            </div>
          </div>
          <div className="source-chip">
            <BookOpen size={13} aria-hidden="true" />
            Structured Programming · Week 6
            <CheckCircle2 size={13} aria-hidden="true" />
          </div>
        </div>

        <div className="ai-composer">
          <span>Ask a follow-up...</span>
          <button type="button" aria-label="Send message preview" disabled>
            <ArrowUp size={16} aria-hidden="true" />
          </button>
        </div>
      </section>

      <div className="floating-note note-one glass-panel">
        <span>Next up</span>
        <strong>Pointer practice</strong>
        <small>5 focused questions</small>
      </div>
      <div className="floating-note note-two glass-panel">
        <span>Learning signal</span>
        <strong>Arrays improving</strong>
        <small>+12% this week</small>
      </div>
    </div>
  );
}
