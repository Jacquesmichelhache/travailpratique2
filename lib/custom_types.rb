class ActivityType
  ACTIVITY_TYPES = %w(Technologie Alimentaire Industriel Divertissement Autre).freeze

  def initialize(activity_type)
    @activity_type = activity_type
  end
 
end